import MyAvatar from '@/assets/avatar.png'

import { MsgType, MsgItem, Chats } from '../../type'
import CousinAvatar from '../cousin-avatar.jpg'

import Image双城记 from './images/双城记.jpg'
import Image另一张自拍 from './images/另一张自拍.jpg'
import Image巨人传 from './images/巨人传.jpg'
import Image操作系统pdf from './images/操作系统pdf.jpg'
import Image操作系统作业 from './images/操作系统作业.jpg'
import Image木偶奇遇记 from './images/木偶奇遇记.jpg'
import Image爱丽丝梦游仙境 from './images/爱丽丝梦游仙境.jpg'
import Image爱的教育 from './images/爱的教育.jpg'
import Image爷爷家的冰花 from './images/爷爷家的冰花.jpg'
import Image红与黑 from './images/红与黑.jpg'
import Image自拍 from './images/自拍.jpg'
import Image飘 from './images/飘.jpg'
import Meme兔斯基1 from './memes/兔斯基_1.png'
import Meme兔斯基2 from './memes/兔斯基_2.png'
import Meme兔斯基3 from './memes/兔斯基_3.png'
import Meme兔斯基4 from './memes/兔斯基_4.png'
import Meme长草颜团子1 from './memes/长草颜团子_1.png'
import Meme长草颜团子2 from './memes/长草颜团子_2.png'
import Voice01在自习 from './voices/01_在自习.mp3'
import Voice02你啥时候放假了 from './voices/02_你啥时候放假了.mp3'
import Voice03我早就放假了 from './voices/03_我早就放假了.mp3'
import Voice04领个试卷回来就完成了 from './voices/04_领个试卷回来就完成了.mp3'
import Voice05试卷还没出来不过做的也挺顺利 from './voices/05_试卷还没出来不过做的也挺顺利.mp3'
import Voice06知道了 from './voices/06_知道了.mp3'
import Voice07你们就这样混日子 from './voices/07_你们就这样混日子.mp3'
import Voice08上课呢 from './voices/08_上课呢.mp3'
import Voice09那你在干什么呀 from './voices/09_那你在干什么呀.mp3'
import Voice10太牛了每天在学校混日子 from './voices/10_太牛了每天在学校混日子.mp3'
import Voice11这么少还要写一天 from './voices/11_这么少还要写一天.mp3'
import Voice12那么两个作业就能 from './voices/12_那么两个作业就能.mp3'
import Voice13我真是被你气死了 from './voices/13_我真是被你气死了.mp3'
import Voice14我又不在你学校 from './voices/14_我又不在你学校.mp3'
import Voice15要不你把题发过来 from './voices/15_要不你把题发过来.mp3'
import Voice16我给你抄答案 from './voices/16_我给你抄答案.mp3'
import Voice17好保证完成 from './voices/17_好保证完成.mp3'
import Voice18快发呀光说大话你这是空想家呀 from './voices/18_快发呀光说大话你这是空想家呀.mp3'
import Voice19好 from './voices/19_好.mp3'
import Voice20你先试着做 from './voices/20_你先试着做.mp3'
import Voice21我帮你抄答案 from './voices/21_我帮你抄答案.mp3'
import Voice22我做不出来你呢 from './voices/22_我做不出来你呢.mp3'
import Voice23做完了吗 from './voices/23_做完了吗.mp3'
import Voice24那你现在在干什么 from './voices/24_那你现在在干什么.mp3'
import Voice25你看什么书 from './voices/25_你看什么书.mp3'
import Voice26你把你的照片发下来 from './voices/26_你把你的照片发下来.mp3'
import Voice27看有没有变了样子 from './voices/27_看有没有变了样子.mp3'
import Voice28回来再看 from './voices/28_回来再看.mp3'
import Voice29可笑 from './voices/29_可笑.mp3'
import Voice30什么了 from './voices/30_什么了.mp3'
import Voice31知道了原来你在看这道题 from './voices/31_知道了原来你在看这道题.mp3'

const history: MsgItem[] = [
  {
    who: 'left',
    type: MsgType.text,
    content: '你上课吗？',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '不上，周四考一门试就放假了',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice01在自习,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice02你啥时候放假了,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '这礼拜四',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '你啥时候放假的？',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '1″',
    content: Voice03我早就放假了,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice04领个试卷回来就完成了,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '期末考试考怎么样呀？',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '4″',
    content: Voice05试卷还没出来不过做的也挺顺利,
  },
  {
    who: 'left',
    type: MsgType.meme,
    content: Meme兔斯基1,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '觉得能考多少？',
  },
  {
    who: 'right',
    type: MsgType.meme,
    content: Meme长草颜团子1,
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '😔',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '寒假作业多嘛？',
  },
  {
    who: 'left',
    type: MsgType.meme,
    content: Meme兔斯基2,
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '不多',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '几号开学了？',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '再有一个星期回家，回来找我玩吧',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '好',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '你是不是上三年级了',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '是的哈哈哈',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '三年级难嘛？',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '不难。你上几年级？',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我大学三年级',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '太牛了',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '明年我就大学毕业了呢',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '好好好。我还是三年级',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '明年你就四年级了呢',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '不是是下册',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '你知道你什么时候小学毕业嘛？',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '是说新年的明年啦，就是2017年，今年不是16年嘛',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '不知道',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '呵呵呵',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '你最近在看什么书呀？',
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image巨人传,
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image双城记,
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image红与黑,
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image爱的教育,
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image木偶奇遇记,
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image飘,
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image爱丽丝梦游仙境,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '好看嘛？',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '当然',
  },
  {
    who: 'left',
    type: MsgType.meme,
    content: Meme兔斯基3,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '看完是不是要写日记呀？',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '不是',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '誒，真好',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '你继续看书去啦，我去洗个头',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '你是放假吗',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我还没放假',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '在学校等考试',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '考完试就可以回家了',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '好笑',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '好笑什么呀？',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '笑你洗头',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '那你不洗嘛？',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '不洗',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '那脏了怎么办？',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '你在等天考试?',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '嗯呀，我们上完课了然后就准备考试啦',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '考试在大后天',
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image自拍,
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '帅不？',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '呀，帅',
  },
  {
    who: 'right',
    type: MsgType.meme,
    content: Meme长草颜团子2,
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '呵呵呵',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '去洗头了',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '好。洗完了告诉我一声',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '嗯',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '洗去把。走你',
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image爷爷家的冰花,
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '爷爷家的冰花',
  },
  {
    who: 'left',
    type: MsgType.meme,
    content: Meme兔斯基4,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '洗完了',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '漂亮吧',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '嗯，漂亮',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '你早上几点起来呀？',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '8点',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我八点半',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '让我看看你的教材书',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '爷爷家里冷嘛？',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '是的',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我的教材在电脑上',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '发过来',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我给你拍个照片吧',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '好',
  },
  {
    who: 'left',
    type: MsgType.image,
    content: Image另一张自拍,
  },
  {
    who: 'right',
    type: MsgType.image,
    content: Image操作系统pdf,
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '你平常上课就电脑？',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '大部分课时',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '小部分课带课本',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '1″',
    content: Voice06知道了,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '课上主要是听老师讲，课本是课下看的',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '1″',
    content: Voice07你们就这样混日子,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice08上课呢,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我们已经没课了',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice09那你在干什么呀,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我现在每天就待学校',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '1″',
    content: Voice10太牛了每天在学校混日子,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我们有作业要写呀',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '好多作业',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '几天回来',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '再有一个星期',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '有多少作业？',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '可多了',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '多少个？',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我现在还有两个，至少要写一天',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '4″',
    content: Voice11这么少还要写一天,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '之前很多作业都写完了',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '4″',
    content: Voice12那么两个作业就能,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '4″',
    content: Voice13我真是被你气死了,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '你要不要帮我写呀？',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '3″',
    content: Voice14我又不在你学校,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '5',
    content: Voice15要不你把题发过来,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我给你发过去你帮我写',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice16我给你抄答案,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '好',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice17好保证完成,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '嗯',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '4″',
    content: Voice18快发呀光说大话你这是空想家呀,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '等一下我在找',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '1″',
    content: Voice19好,
  },
  {
    who: 'right',
    type: MsgType.image,
    content: Image操作系统作业,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '这是第一个作业',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '不会。',
  },
  {
    who: 'left',
    type: MsgType.text,
    content: '我还是帮你做把',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '那你快看看怎么做',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '你要是不会做的话我就自己去做了',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice20你先试着做,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice21我帮你抄答案,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '嗯，那我先去试试做了',
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '做出来了吗？',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice22我做不出来你呢,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '我下午试试看',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '1″',
    content: Voice23做完了吗,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '还没，要下午才做呢',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice24那你现在在干什么,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '在看书',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '4″',
    content: Voice25你看什么书,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice26你把你的照片发下来,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '等回去给你看',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '1″',
    content: Voice27看有没有变了样子,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice28回来再看,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '就是之前给你发的',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '2″',
    content: Voice29可笑,
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '1″',
    content: Voice30什么了,
  },
  {
    who: 'right',
    type: MsgType.image,
    content: Image操作系统pdf,
  },
  {
    who: 'right',
    type: MsgType.text,
    content: '就这个',
  },
  {
    who: 'left',
    type: MsgType.voice,
    voiceLength: '3″',
    content: Voice31知道了原来你在看这道题,
  },
]

const chats: Chats = {
  history,
  leftName: '👶',
  leftAvatar: CousinAvatar,
  rightAvatar: MyAvatar,
}

export default chats
