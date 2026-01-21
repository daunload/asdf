/**
 * Purchase 엔티티 타입 정의
 */

export interface Purchase {
  id: string;
  userId: string;
  topicIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePurchaseInput {
  userId: string;
  topicIds: string[];
}
