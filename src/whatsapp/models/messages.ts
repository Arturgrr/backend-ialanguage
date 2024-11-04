import { z } from "zod";

const TextMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("text"),
  text: z.object({
    body: z.string(),
  }),
  context: z
    .object({
      from: z.string(),
      id: z.string(),
      referred_product: z
        .object({
          catalog_id: z.string(),
          product_retailer_id: z.string(),
        })
        .optional(),
    })
    .optional(),
  referral: z.any().optional(),
});

const ReactionMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("reaction"),
  reaction: z.object({
    message_id: z.string(),
    emoji: z.string(),
  }),
});

const ImageMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("image"),
  image: z.object({
    caption: z.string().optional(), // Isso é o texto quem vem junto com a imagem
    mime_type: z.string(),
    sha256: z.string(),
    id: z.string(),
  }),
});

const VideoMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("video"),
  video: z.object({
    caption: z.string().optional(), // Isso é o texto quem vem junto com o video
    mime_type: z.string(),
    sha256: z.string(),
    id: z.string(),
  }),
});

const StickerMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("sticker"),
  sticker: z.object({
    mime_type: z.string(),
    sha256: z.string(),
    id: z.string(),
    animated: z.boolean(),
  }),
});

const AudioMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("audio"),
  audio: z.object({
    mime_type: z.string(),
    sha256: z.string(),
    id: z.string(),
    voice: z.boolean(),
  }),
});

const DocumentMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("document"),
  document: z.object({
    filename: z.string(),
    mime_type: z.string(),
    id: z.string(),
    sha256: z.string(),
  }),
});

const ContactMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("contacts"),
  contacts: z.array(
    z.object({
      birthday: z.string().optional(),
      name: z.object({
        first_name: z.string(),
        formatted_name: z.string(),
      }),
      phones: z.array(
        z.object({
          phone: z.string(),
          type: z.string(),
          wa_id: z.string(),
        })
      ),
    })
  ),
});

// SERIA ESSE PARA AS ENQUETES?
const UnknownMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("unsupported"),
  errors: z.array(
    z.object({
      code: z.number(),
      details: z.string().optional(),
      title: z.string(),
      message: z.string(),
      error_data: z.object({
        details: z.string(),
      }),
    })
  ),
});

const LocationMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("location"),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    name: z.string().optional(),
    address: z.string().optional(),
  }),
});

// TESTAR!
const ButtonMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("button"),
  button: z.object({
    texto: z.string(),
    payload: z.string(),
  }),
});

// TESTAR!
const ListReplySchema = z.object({
  type: z.literal("list_reply"),
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

// TESTAR!
const ButtonReplySchema = z.object({
  type: z.literal("button_reply"),
  id: z.string(),
  title: z.string(),
});

// TESTAR!
const InteractiveMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("interactive"),
  interactive: z.union([ListReplySchema, ButtonReplySchema]),
});

// TESTAR!
const OrderMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("order"),
  order: z.object({
    catalog_id: z.string(),
    product_items: z.array(
      z.object({
        product_retailer_id: z.string(),
        quantity: z.string(),
        item_price: z.string(),
        currency: z.string(),
      })
    ),
    text: z.string(),
  }),
  context: z.object({
    from: z.string(),
    id: z.string(),
  }),
});

// TESTAR!
const SystemMessagesSchema = z.object({
  from: z.string().or(z.number()),
  id: z.string(),
  timestamp: z.string().or(z.number()),
  type: z.literal("system"),
  system: z.object({
    body: z.string(),
    new_wa_id: z.string(),
    type: z.literal("user_changed_number"),
  }),
});

// NEM TEM COMO
// const ExcludedMessageSchema = z.object({
//   from: z.string().or(z.number()),
//   id: z.string(),
//   timestamp: z.string().or(z.number()),
//   type: z.literal("unsupported"),
//   errors: z.array(
//     z.object({
//       code: z.number(),
//       details: z.string(),
//       title: z.string(),
//     })
//   ),
// });

const SentMessageStatusesSchema = z.object({
  id: z.string(),
  status: z.literal("sent"),
  timestamp: z.string().or(z.number()),
  recipient_id: z.string(),
  conversation: z.object({
    id: z.string(),
    expiration_timestamp: z.string().optional(),
    origin: z.object({
      type: z.string(),
    }),
  }),
  pricing: z.object({
    billable: z.boolean(),
    pricing_model: z.literal("CBP"),
    category: z.string(),
  }),
});

const DeliveredMessageStatusesSchema = z.object({
  id: z.string(),
  status: z.literal("delivered"),
  timestamp: z.string().or(z.number()),
  recipient_id: z.string(),
  conversation: z.object({
    id: z.string(),
    origin: z.object({
      type: z.string(),
    }),
  }),
  pricing: z.object({
    billable: z.boolean(),
    pricing_model: z.literal("CBP"),
    category: z.string(),
  }),
});

const ReadMessageStatusesSchema = z.object({
  id: z.string(),
  status: z.literal("read"),
  timestamp: z.string().or(z.number()),
  recipient_id: z.string(),
});

const FailedMessageStatusesSchema = z.object({
  id: z.string(),
  status: z.literal("read"),
  timestamp: z.string().or(z.number()),
  recipient_id: z.string(),
  errors: z.array(
    z.object({
      code: z.number(),
      title: z.string(),
      message: z.string(),
      error_data: z.object({
        details: z.string(),
      }),
      href: z.string().url(),
    })
  ),
});

const MessagesSchema = z.discriminatedUnion("type", [
  TextMessagesSchema,
  ReactionMessagesSchema,
  ImageMessagesSchema,
  StickerMessagesSchema,
  UnknownMessagesSchema,
  LocationMessagesSchema,
  ButtonMessagesSchema,
  InteractiveMessagesSchema,
  OrderMessagesSchema,
  SystemMessagesSchema,
  AudioMessagesSchema,
  DocumentMessagesSchema,
  ContactMessagesSchema,
  VideoMessagesSchema,
]);

const ValueSchema = z.union([
  z.object({
    messaging_product: z.literal("whatsapp"),
    metadata: z.object({
      display_phone_number: z.string().or(z.number()),
      phone_number_id: z.string().or(z.number()),
    }),
    contacts: z
      .array(
        z.object({
          profile: z.object({
            name: z.string(),
          }),
          wa_id: z.string(),
        })
      )
      .optional(),
    messages: z.array(MessagesSchema).optional(),
    statuses: z.undefined().optional(),
  }),

  // Casos onde há 'statuses'
  z.object({
    messaging_product: z.literal("whatsapp"),
    metadata: z.object({
      display_phone_number: z.string().or(z.number()),
      phone_number_id: z.string().or(z.number()),
    }),
    statuses: z.array(
      z.union([
        SentMessageStatusesSchema,
        ReadMessageStatusesSchema,
        FailedMessageStatusesSchema,
        DeliveredMessageStatusesSchema,
      ])
    ),
    messages: z.undefined().optional(),
  }),
]);

export const MessageSchema = z.object({
  object: z.string(),
  entry: z.array(
    z.object({
      id: z.string(),
      changes: z.array(
        z.object({
          field: z.literal("messages"),
          value: ValueSchema, // Usa a união inteligente
        })
      ),
    })
  ),
});
``;
