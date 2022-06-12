import dumplingImage11 from '../assets/camp/dumpling/11.jpeg'
import dumplingImage12 from '../assets/camp/dumpling/12.jpeg'
import dumplingImage13 from '../assets/camp/dumpling/13.jpeg'
import dumplingImage21 from '../assets/camp/dumpling/21.jpeg'
import dumplingImage22 from '../assets/camp/dumpling/22.jpeg'
import dumplingImage23 from '../assets/camp/dumpling/23.jpeg'
import dumplingImage31 from '../assets/camp/dumpling/31.jpeg'
import dumplingImage32 from '../assets/camp/dumpling/32.jpeg'
import dumplingImage33 from '../assets/camp/dumpling/33.jpeg'
import jsTruthyImage11 from '../assets/camp/js-truthy/11.png'
import jsTruthyImage12 from '../assets/camp/js-truthy/12.png'
import jsTruthyImage13 from '../assets/camp/js-truthy/13.png'
import jsTruthyImage21 from '../assets/camp/js-truthy/21.png'
import jsTruthyImage22 from '../assets/camp/js-truthy/22.png'
import jsTruthyImage23 from '../assets/camp/js-truthy/23.png'
import jsTruthyImage31 from '../assets/camp/js-truthy/31.png'
import jsTruthyImage32 from '../assets/camp/js-truthy/32.png'
import jsTruthyImage33 from '../assets/camp/js-truthy/33.png'

interface ICellItem {
  imgUrl: string
  description: string
}

interface ICamp {
  mainTitle: string
  ht1: string
  hst1: string
  ht2: string
  hst2: string
  ht3: string
  hst3: string
  vt1: string
  vst1: string
  vt2: string
  vst2: string
  vt3: string
  vst3: string
  cell11: ICellItem
  cell12: ICellItem
  cell13: ICellItem
  cell21: ICellItem
  cell22: ICellItem
  cell23: ICellItem
  cell31: ICellItem
  cell32: ICellItem
  cell33: ICellItem
}

const demo: Record<'square' | 'jsTruthy', ICamp> = {
  square: {
    mainTitle: '饺子阵营图',
    ht1: '形式纯粹主义',
    hst1: '必须使用面皮包起来',
    ht2: '形式兼容主义',
    hst2: '使用什么包起来都行',
    ht3: '形式自由主义',
    hst3: '为什么一定要包起来',
    vt1: '定义纯粹主义',
    vst1: '必须有馅料',
    vt2: '定义中立主义',
    vst2: '包别的也可以',
    vt3: '定义自由主义',
    vst3: '有没有馅料无所谓',
    cell11: {
      imgUrl: dumplingImage11,
      description: '饺子是一种饺子',
    },
    cell12: {
      imgUrl: dumplingImage12,
      description: '粽子是一种饺子',
    },
    cell13: {
      imgUrl: dumplingImage13,
      description: '丸子是一种饺子',
    },
    cell21: {
      imgUrl: dumplingImage21,
      description: '煎饼果子是一种饺子',
    },
    cell22: {
      imgUrl: dumplingImage22,
      description: '鸡蛋是一种饺子',
    },
    cell23: {
      imgUrl: dumplingImage23,
      description: '汉堡是一种饺子',
    },
    cell31: {
      imgUrl: dumplingImage31,
      description: '馒头是一种饺子',
    },
    cell32: {
      imgUrl: dumplingImage32,
      description: '瑞士卷是一种饺子',
    },
    cell33: {
      imgUrl: dumplingImage33,
      description: '冰棍是一种饺子',
    },
  },
  jsTruthy: {
    mainTitle: 'JS真值阵营图',
    ht1: '形式纯粹派',
    hst1: '必须同是原始值',
    ht2: '形式兼容派',
    hst2: '同是引用值也可以',
    ht3: '形式自由派',
    hst3: '为什么要区分引用值',
    vt1: '定义纯粹派',
    vst1: '必须要是同一个值',
    vt2: '定义中立派',
    vst2: '看起来差不多也可以',
    vt3: '定义自由派',
    vst3: '为什么一定要看起来一样',
    cell11: {
      imgUrl: jsTruthyImage11,
      description: 'true == true',
    },
    cell12: {
      imgUrl: jsTruthyImage12,
      description: 'Boolean(true) == Boolean(true)',
    },
    cell13: {
      imgUrl: jsTruthyImage13,
      description: 'Boolean(true) == true',
    },
    cell21: {
      imgUrl: jsTruthyImage21,
      description: '"0" == 0',
    },
    cell22: {
      imgUrl: jsTruthyImage22,
      description: 'String("0") == Number(0)',
    },
    cell23: {
      imgUrl: jsTruthyImage23,
      description: '[0] == 0',
    },
    cell31: {
      imgUrl: jsTruthyImage31,
      description: 'null == undefined',
    },
    cell32: {
      imgUrl: jsTruthyImage32,
      description: '[[]] == Boolean(false)',
    },
    cell33: {
      imgUrl: jsTruthyImage33,
      description: '[[]] == ""',
    },
  },
}

export default demo
