import type { WasteType, BinId } from '../types';

export type WasteItem = {
  id: string;
  type: WasteType;
  name: string;
  hint: string;
};

export type Bin = {
  id: BinId;
  label: string;
  caption: string;
};

export const bins: Bin[] = [
  { id: 'plastic', label: 'Пластик', caption: 'бутылки, упаковка' },
  { id: 'paper', label: 'Бумага', caption: 'листы, картон' },
  { id: 'glass', label: 'Стекло', caption: 'банки, бутылки' },
  { id: 'metal', label: 'Металл', caption: 'банки, фольга' },
  { id: 'battery', label: 'Опасное', caption: 'батарейки, техника' },
  { id: 'organic', label: 'Органика', caption: 'еда, листья' },
];

export const wasteItems: WasteItem[] = [
  {
    id: 'bottle',
    type: 'plastic',
    name: 'Пластиковая бутылка',
    hint: 'Пластик живёт сотни лет, если его не переработать.',
  },
  {
    id: 'paper',
    type: 'paper',
    name: 'Смятая бумага',
    hint: 'Бумага перерабатывается, если она сухая и без еды.',
  },
  {
    id: 'glass',
    type: 'glass',
    name: 'Стеклянная банка',
    hint: 'Стекло можно переплавлять снова и снова.',
  },
  {
    id: 'can',
    type: 'metal',
    name: 'Жестяная банка',
    hint: 'Металл — ценный ресурс, его почти всегда можно сдать.',
  },
  {
    id: 'battery',
    type: 'battery',
    name: 'Батарейка',
    hint: 'Батарейки нельзя выбрасывать вместе с обычным мусором.',
  },
  {
    id: 'peel',
    type: 'organic',
    name: 'Яблочные очистки',
    hint: 'Органика становится почвой, если её компостировать.',
  },
];

export const sortMistakes: Record<WasteType, string> = {
  plastic: 'Почти! Пластик лучше отправлять в контейнер для вторсырья, а не к пищевым отходам.',
  paper: 'Почти! Сухая бумага идёт в макулатуру — так из неё снова сделают листы.',
  glass: 'Почти! Стекло не компостируется и не горит безопасно. Ему нужен свой контейнер.',
  metal: 'Почти! Металлическую банку ждут на пункте приёма, а не в органике.',
  battery:
    'Почти! Батарейки нельзя выбрасывать вместе с обычным мусором. Внутри тяжёлые металлы.',
  organic: 'Почти! Очистки — это еда для почвы. Им место в органике, не в пластике.',
};
