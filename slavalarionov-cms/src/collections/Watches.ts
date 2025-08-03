import type { CollectionConfig } from 'payload'

const Watches: CollectionConfig = {
  slug: 'watches',
  fields: [
    {
      name: 'model',
      type: 'text',
      required: true,
      label: 'Модель',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // коллекция для хранения файлов
      required: true,
      label: 'Изображение модели',
    },
    {
      name: 'sizes',
      type: 'array',
      label: 'Размеры',
      required: true,
      fields: [
        {
          name: 'size',
          type: 'text',
          required: true,
          label: 'Размер',
        },
      ],
    },
    {
      name: 'colors',
      type: 'array',
      label: 'Цвета',
      required: true,
      fields: [
        {
          name: 'colorName',
          type: 'text',
          required: true,
          label: 'Название цвета',
        },
        {
          name: 'colorHex',
          type: 'text',
          required: true,
          label: 'HEX цвет (например, #FFFFFF)',
        },
      ],
    },
  ],
};

export default Watches;
