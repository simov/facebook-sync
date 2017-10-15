
# facebook-sync

- Syncs multiple Facebook feeds and their posts, created since certain point in time and also removes duplicate posts.
- Syncs Facebook events based on feed posts.
- Post's and Event's fields to retrieve can be configured.

## CLI

```bash
node bin/ \
  --auth auth.json \
  --config config.json \
  --fields fields.json \
  --db db.json \
  --sync feeds|events
```

## auth.json

```json
{
  "development": {
    "token": "[Facebook Access Token]"
  }
}
```

## config.json

```json
{
  "development": {
    "nuc": {
      "feeds": [
        "[Feed ID 1]",
        "[Feed ID N]"
      ],
      "sync": {
        "limit": 10, // how many posts to retrieve from each feed
        "since": 0 // filter posts created since timestamp (automatically updated)
      }
    }
  }
}
```

## fields.json

```json
{
  "development": {
    "post": [
      "id",
      "admin_creator",
      "application",
      "call_to_action",
      "caption",
      "created_time",
      "description",
      "feed_targeting",
      "from",
      "icon",
      "instagram_eligibility",
      "is_hidden",
      "is_instagram_eligible",
      "is_published",
      "link",
      "message",
      "message_tags",
      "name",
      "object_id",
      "parent_id",
      "permalink_url",
      "picture",
      "place",
      "privacy",
      "properties",
      "shares",
      "source",
      "status_type",
      "story",
      "story_tags",
      "targeting",
      "to",
      "type",
      "updated_time",
      "with_tags"
    ],
    "event": [
      "id",
      "attending_count",
      "can_guests_invite",
      "can_viewer_post",
      "category",
      "cover",
      "declined_count",
      "description",
      "end_time",
      "guest_list_enabled",
      "interested_count",
      "is_canceled",
      "is_draft",
      "is_page_owned",
      "is_viewer_admin",
      "maybe_count",
      "name",
      "noreply_count",
      "owner",
      "parent_group",
      "place",
      "start_time",
      "ticket_uri",
      "timezone",
      "type",
      "updated_time"
    ]
  }
}
```

## db.json

```json
[] // initially empty, will be populated automatically
```
