import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
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
}: ReferenceStatementProps): JSX.Element => (
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

export default ReferenceStatement
