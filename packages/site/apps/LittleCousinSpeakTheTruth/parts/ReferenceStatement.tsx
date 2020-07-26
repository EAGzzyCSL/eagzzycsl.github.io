import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import React from 'react'

import styles from './ReferenceStatement.module.scss'

interface ReferenceStatementProps {
  title: string
  content: string
  linkTitle: string
  href: string
}

const ReferenceStatement = ({
  title,
  content,
  linkTitle,
  href,
}: ReferenceStatementProps): JSX.Element => {
  return (
    <section className={styles.referenceStatement}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary' href={href} target='_blank'>
            {linkTitle}
          </Button>
        </CardActions>
      </Card>
    </section>
  )
}

export default ReferenceStatement
