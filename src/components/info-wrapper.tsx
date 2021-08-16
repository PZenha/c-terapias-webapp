import React, { FC } from 'react'
import '../pages/client/client-info.scss'


const InfoWrapper: FC<{icon?: JSX.Element, info: string}> = ({icon, info}) => (
	<div className="info-wrapper">
		{icon}
		<span>{info}</span>
	</div>
)

export default InfoWrapper