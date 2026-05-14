// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      id?: number
    }
  }
}

export {}