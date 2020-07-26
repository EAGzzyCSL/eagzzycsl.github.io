import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import React from 'react'

import styles from './AboutCard.module.scss'

import AboutCardHeaderImage from '../assets/about-header.png'

const AboutCard = (): JSX.Element => {
  return (
    <Card className={styles.aboutCard}>
      <CardActionArea>
        <CardMedia component='img' image={AboutCardHeaderImage} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            关于
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            👶是我表弟，我上大学时他在上小学，2016年年初，我还在学校，他已经放寒假在家。
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            一天我正在完成期末作业时，他用我妈手机找我微信聊天。我俩对话中他用小学的经验来理解大学生活，殊为真实有趣。
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default AboutCard
