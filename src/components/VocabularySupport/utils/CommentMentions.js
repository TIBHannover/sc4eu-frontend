//UUID-regex, for mention structure as: @{user-uuid} with fallback to UNKNOWN_USER if user-uuid doesn't match UUID syntax
const MENTION_TOKEN = /@\{([0-9a-f-]{36})\}/gi;
const UNKNOWN_USER = 'unknown user';

const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Replaces `@Display Name` with `@{uuid}` for the picked mentions.
 * Returns the text to store and the uuids that are actually still mentioned in it.
 */
export function serializeMentions(text, mentions) {
    const mentionedUsers = [];
    let content = text;

    [...mentions]
        .sort((a, b) => b.display_name.length - a.display_name.length)
        .forEach(({ uuid, display_name }) => {
            const pattern = new RegExp(`@${escapeRegExp(display_name)}(?![\\w-])`, 'g');
            if (pattern.test(content)) {
                content = content.replace(pattern, `@{${uuid}}`);
                if (!mentionedUsers.includes(uuid)) {
                    mentionedUsers.push(uuid);
                }
            }
        });

    return { content, mentionedUsers };
}

/** Replaces `@{uuid}` with `@<current display name>`. */
export function deserializeMentions(content, users) {
    if (!content) {
        return content;
    }
    const names = new Map((users ?? []).map(user => [user.uuid?.toLowerCase(), user.display_name]));
    return content.replace(MENTION_TOKEN, (_, uuid) => `@${names.get(uuid.toLowerCase()) ?? UNKNOWN_USER}`);
}

export function getUserName(users, uuid, fallback = UNKNOWN_USER) {
    return users.find(user => user.uuid === uuid)?.display_name ?? fallback;
}

export function getCommentAuthorName(comment, users) {
    return comment.author_uuid ? getUserName(users ?? [], comment.author_uuid) : comment.author ?? UNKNOWN_USER;
}
