import React, { useMemo } from 'react'

import pinyin from 'pinyin'

import MiSquare from '@/share/MiSquare'

import PinyinItem from './PinyinItem'
import styles from './Spell.module.scss'

interface SpellProps {
  text: string
}

const Spell = ({ text }: SpellProps): JSX.Element => {
  const pinyinList = useMemo(
    () =>
      // 应对可能要强行给字母加拼音的场景
      text.split('').map(
        item =>
          pinyin(item, {
            heteronym: true,
            // 开启分词会有性能问题，因此web版没有提供分词功能
          })[0],
      ),
    [text],
  )

  return (
    <div className={styles.spell}>
      {text.split('').map((char, index, arr) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          {/* 拼音 */}
          <PinyinItem pinyinOfChar={pinyinList[index]} />
          {/* 米字格 */}
          <div className={styles.block}>
            <MiSquare noBorderRight={index !== arr.length - 1}>
              <div className={styles.char}>{char}</div>
            </MiSquare>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Spell
