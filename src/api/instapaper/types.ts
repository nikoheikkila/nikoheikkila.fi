import {
  array,
  Codec,
  exactly,
  GetType,
  number,
  optional,
  string,
} from "purify-ts";

export const AccessTokenCodec = Codec.interface({
  id: string,
  secret: string,
});

export const ListBookmarksCodec = Codec.interface({
  user: Codec.interface({
    type: exactly("user"),
    user_id: number,
    username: string,
  }),
  bookmarks: array(
    Codec.interface({
      type: exactly("bookmark"),
      bookmark_id: number,
      url: string,
      title: string,
      description: string,
    })
  ),
  highlights: optional(
    array(
      Codec.interface({
        type: exactly("highlight"),
        highlight_id: number,
        bookmark_id: number,
        text: string,
        position: number,
        time: number,
      })
    )
  ),
  delete_ids: optional(array(number)),
});

export type ListBookmarksResponse = GetType<typeof ListBookmarksCodec>;

export type Token = GetType<typeof AccessTokenCodec>;
