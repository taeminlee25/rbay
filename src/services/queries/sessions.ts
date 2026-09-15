import type { Session } from '$services/types';
import { sessionKey } from '$services/keys';
import { client } from '$services/redis';

export const getSession = async (id: string) => {
	const session = await client.hGetAll(sessionKey(id));

	if (Object.keys(session).length === 0) {
		return null;
	}

	return deserialize(id, session);
};

export const saveSession = async (session: Session) => {
	return client.hSet(sessionKey(session.id), serialize(session));
};

const deserialize = (
	id: string,
	session: {
		[keys: string]: string;
	}
) => {
	return {
		id,
		userId: session.userId,
		username: session.username
	};
};

const serialize = (session: Session) => {
	return {
		userId: session.userId,
		username: session.username
	};
};
