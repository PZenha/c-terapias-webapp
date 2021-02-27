import React, { FC } from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	Typography,
} from '@material-ui/core'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

interface IProps {
  created_at: string
  description: string
}

export const ObsCard: FC<IProps> = ({
	created_at,
	description,
}: {
  created_at: string
  description: string
}) => {
	return (
		<>
			<div style={style}>
				<Card>
					<CardHeader
						subheader={`Data da observação: ${dayjs(
							created_at,
						).format('D/M/YYYY')}`}
					/>
					<CardContent>
						<Typography variant="body1" component="p">
							{description}
						</Typography>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

const style = {
	margin: '50px',
	width: '60%',
}

export default ObsCard
