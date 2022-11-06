import { FC } from 'react'
import Image from 'next/image'
import { CameraIcon } from '@heroicons/react/solid'
import { format } from 'date-fns'
import useStore from '../store'
import { useQueryProfile } from '../hooks/useQueryProfile'
import { useMutateProfile } from '../hooks/useMutateProfile'
import { useUploadAvatarImg } from '../hooks/useUploadAvatarImg'
import { useDownloadUrl } from '../hooks/useDownloadUrl'
import { Spinner } from './Spinner'

export const UserProfile: FC = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)
  const { data: profile } = useQueryProfile()
  const { updateProfileMutation } = useMutateProfile()
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(
    editedProfile.avatar_url,
    'avatars'
  )
  return <div>UserProfile</div>
}
