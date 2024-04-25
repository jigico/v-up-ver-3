'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  addLikedUser,
  getClickLikedUser,
  removeLikedUser,
  updateLikeCountInCommunity,
} from '@/shared/communitydetail/detailApi'
import { Props } from '@/types/communityDetail/detailTypes'
import emptyHeart from '@/../public/images/heart-rounded-gray.svg'
import heart from '@/../public/images/likeFullHeart.svg'

const LikeButton = ({ boardId }: Props) => {
  const { data: userSessionInfo } = useSession()
  const uid = userSessionInfo?.user.uid
  const [like, setLike] = useState<boolean | null>(null)
  const [likeList, setLikeList] = useState<string[]>([])
  const [likeCount, setLikeCount] = useState<number>(0)

  const likeLength =
    likeList && likeList.length > 99 ? 99 : likeList ? likeList.length : 0
  const likePlusCondition =
    likeList && likeList.length && likeList.length > 99 ? '+' : null

  useEffect(() => {
    const likedStatus = async () => {
      const clickLikedUser = await getClickLikedUser(boardId)
      const likeList = clickLikedUser?.likeList

      if (uid && clickLikedUser && likeList && likeList.includes(uid)) {
        setLike(true)
      } else {
        setLike(false)
      }
      setLikeList(likeList || [])
      if (likeList) {
        setLikeCount(likeList.length || 0)
      }
    }

    likedStatus()
  }, [uid, boardId])

  const onLikeToggleHandler = async () => {
    if (!uid) {
      alert('로그인 후 이용해 주세요.')
      return
    }

    if (like && likeList) {
      const updatedLikeList = likeList && likeList.filter((id) => id !== uid)
      await removeLikedUser(likeList, boardId, uid)
      setLike(false)
      setLikeList(updatedLikeList)
      setLikeCount(updatedLikeList.length)
      await updateLikeCountInCommunity(boardId, updatedLikeList.length)
    } else {
      const updatedLikeList = [...likeList, uid]
      await addLikedUser(likeList, boardId, uid)
      setLike(true)
      setLikeList(updatedLikeList)
      setLikeCount(updatedLikeList.length)
      await updateLikeCountInCommunity(boardId, updatedLikeList.length)
    }
    const updatedLikeList = like
      ? likeList.filter((id) => id !== uid)
      : [...likeList, uid]
    setLikeList(updatedLikeList)
    setLike(!like)
  }
  return (
    <div>
      <div className='flex gap-[7px]'>
        <figure onClick={onLikeToggleHandler} className='cursor-pointer'>
          {like ? (
            <Image src={heart} alt='꽉찬좋아요 아이콘' width={24} height={24} />
          ) : (
            <Image
              src={emptyHeart}
              alt='빈좋아요 아이콘'
              width={24}
              height={24}
            />
          )}
        </figure>

        <p className='text-[rgba(255,255,255,0.5)]'>
          {likeLength}
          {likePlusCondition}
        </p>
      </div>
    </div>
  )
}

export default LikeButton
