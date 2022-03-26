import React, { useContext } from 'react'
import Prof from '../../components/profile/Profile'
import { Context } from '../../context/Context'


export default function Profile() {
  const {user} = useContext(Context)
  return (
    <div>
        <Prof user={user} />
    </div>
  )
}
