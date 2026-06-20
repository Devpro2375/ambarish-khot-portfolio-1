import {
  MongoClient,
  ObjectId,
  type Collection,
  type Db,
  type Document,
  type Filter,
  type Sort,
} from 'mongodb';

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

const collectionNames = [
  'admin_users',
  'projects',
  'insights',
  'contact_submissions',
  'feedback_submissions',
] as const;

export type CollectionName = (typeof collectionNames)[number];

function getMongoUri() {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Add your MongoDB connection string to .env or Vercel Environment Variables.'
    );
  }

  return uri;
}

function getMongoDbName() {
  return (
    process.env.MONGODB_DB_NAME ||
    process.env.MONGODB_DATABASE ||
    process.env.DATABASE_NAME ||
    'ambrish_khot'
  );
}

function getClientPromise() {
  if (globalForMongo.mongoClientPromise) {
    return globalForMongo.mongoClientPromise;
  }

  const client = new MongoClient(getMongoUri());
  const clientPromise = client.connect();

  if (process.env.NODE_ENV !== 'production') {
    globalForMongo.mongoClientPromise = clientPromise;
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(getMongoDbName());
}

export async function getCollection<T extends Document>(
  name: CollectionName
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

function isObjectId(id: string) {
  return ObjectId.isValid(id) && new ObjectId(id).toHexString() === id;
}

function idFilter(id: string): Filter<Document> {
  if (isObjectId(id)) {
    return { $or: [{ _id: new ObjectId(id) }, { id }] };
  }

  return { id };
}

function serializeValue(value: unknown): unknown {
  if (value instanceof ObjectId) {
    return value.toHexString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, serializeValue(item)])
    );
  }

  return value;
}

export function serializeDoc<T>(doc: Document | null): T | null {
  if (!doc) {
    return null;
  }

  const { _id, ...rest } = doc;
  const serializedRest = serializeValue(rest) as Record<string, unknown>;

  return {
    ...serializedRest,
    id: typeof rest.id === 'string' ? rest.id : serializeValue(_id),
  } as T;
}

export function serializeDocs<T>(docs: Document[]): T[] {
  return docs.map((doc) => serializeDoc<T>(doc)).filter(Boolean) as T[];
}

function cleanValues(values: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([key, value]) => key !== 'id' && key !== '_id' && value !== undefined
    )
  );
}

export async function findRows<T>(
  name: CollectionName,
  filter: Filter<Document> = {},
  sort?: Sort
): Promise<T[]> {
  const collection = await getCollection(name);
  const cursor = collection.find(filter);

  if (sort) {
    cursor.sort(sort);
  }

  return serializeDocs<T>(await cursor.toArray());
}

export async function findOne<T>(
  name: CollectionName,
  filter: Filter<Document>
): Promise<T | null> {
  const collection = await getCollection(name);
  return serializeDoc<T>(await collection.findOne(filter));
}

export async function findById<T>(
  name: CollectionName,
  id: string
): Promise<T | null> {
  return findOne<T>(name, idFilter(id));
}

export async function insertRow<T>(
  name: CollectionName,
  values: Record<string, unknown>
): Promise<T> {
  const collection = await getCollection(name);
  const now = new Date().toISOString();
  const document = {
    ...cleanValues(values),
    created_at: values.created_at ?? now,
    updated_at: values.updated_at ?? now,
  };

  const result = await collection.insertOne(document);
  const inserted = await collection.findOne({ _id: result.insertedId });

  return serializeDoc<T>(inserted)!;
}

export async function updateRow<T>(
  name: CollectionName,
  id: string,
  values: Record<string, unknown>
): Promise<T | null> {
  const collection = await getCollection(name);
  const result = await collection.findOneAndUpdate(
    idFilter(id),
    {
      $set: {
        ...cleanValues(values),
        updated_at: new Date().toISOString(),
      },
    },
    { returnDocument: 'after' }
  );

  return serializeDoc<T>(result);
}

export async function deleteById(name: CollectionName, id: string) {
  const collection = await getCollection(name);
  const result = await collection.deleteOne(idFilter(id));
  return result.deletedCount > 0;
}
