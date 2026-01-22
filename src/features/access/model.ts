/**
 * 접근 제어 로직
 *
 * 사용자가 특정 주제를 볼 수 있는지 확인하고, 해금된 주제 목록을 반환합니다.
 */

import { db } from '@/shared/lib/db';
import { isFreeTopic, freeTopics } from '@/shared/config/topics';

/**
 * 사용자가 특정 주제를 볼 수 있는지 확인
 *
 * @param userId 사용자 ID (null이면 비인증 사용자)
 * @param topicId 주제 ID
 * @returns true면 볼 수 있음, false면 볼 수 없음
 */
export async function canViewTopic(
	userId: string | null,
	topicId: string,
): Promise<boolean> {
	// 무료 주제는 항상 볼 수 있음
	if (isFreeTopic(topicId)) {
		return true;
	}

	// 비인증 사용자는 유료 주제를 볼 수 없음
	if (!userId) {
		return false;
	}

	// 유료 주제는 구매 이력 확인
	const purchase = await db.purchase.findFirst({
		where: {
			userId,
			topicIds: {
				has: topicId, // PostgreSQL 배열에서 포함 여부 확인
			},
		},
	});

	return purchase !== null;
}

/**
 * 사용자가 해금한 주제 ID 배열 반환
 *
 * @param userId 사용자 ID (null이면 비인증 사용자)
 * @returns 해금된 주제 ID 배열 (무료 주제 + 구매한 유료 주제)
 */
export async function getUnlockedTopics(
	userId: string | null,
): Promise<string[]> {
	// 무료 주제는 항상 포함
	const freeTopicIds = freeTopics.map((topic) => topic.id);

	// 비인증 사용자는 무료 주제만 볼 수 있음
	if (!userId) {
		return freeTopicIds;
	}

	// 구매한 유료 주제 조회
	const purchases = await db.purchase.findMany({
		where: {
			userId,
		},
		select: {
			topicIds: true,
		},
	});

	// 구매한 주제 ID 수집 (중복 제거)
	const purchasedTopicIds = new Set<string>();
	for (const purchase of purchases) {
		for (const topicId of purchase.topicIds) {
			purchasedTopicIds.add(topicId);
		}
	}

	// 무료 주제 + 구매한 유료 주제 반환
	return [...freeTopicIds, ...Array.from(purchasedTopicIds)];
}

/**
 * 사용자가 특정 주제를 구매했는지 확인
 *
 * @param userId 사용자 ID
 * @param topicId 주제 ID
 * @returns true면 구매함, false면 구매하지 않음
 */
export async function hasPurchasedTopic(
	userId: string,
	topicId: string,
): Promise<boolean> {
	// 무료 주제는 항상 "구매"한 것으로 간주
	if (isFreeTopic(topicId)) {
		return true;
	}

	const purchase = await db.purchase.findFirst({
		where: {
			userId,
			topicIds: {
				has: topicId,
			},
		},
	});

	return purchase !== null;
}
