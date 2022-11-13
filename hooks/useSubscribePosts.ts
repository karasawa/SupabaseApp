import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'
import { Post } from '../types'

export const useSubscribePosts = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('posts')
      .on('INSERT', (payload: SupabaseRealtimePayload<Post>) => {
        let previousPosts = queryClient.getQueryData<Post[]>(['posts'])
        if (!previousPosts) {
          previousPosts = []
        }
        queryClient.setQueryData(
          ['posts'],
          [
            ...previousPosts,
            {
              id: payload.new.id,
              created_at: payload.new.created_at,
              user_id: payload.new.user_id,
              title: payload.new.title,
              post_url: payload.new.post_url,
            },
          ]
        )
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Post>) => {
        let previousPosts = queryClient.getQueryData<Post[]>(['posts'])
        if (!previousPosts) {
          previousPosts = []
        }
        queryClient.setQueryData(
          ['posts'],
          previousPosts.map((post) =>
            post.id === payload.new.id
              ? {
                  id: payload.new.id,
                  created_at: payload.new.created_at,
                  user_id: payload.new.user_id,
                  title: payload.new.title,
                  post_url: payload.new.post_url,
                }
              : post
          )
        )
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Post>) => {
        let previousPosts = queryClient.getQueryData<Post[]>(['posts'])
        if (!previousPosts) {
          previousPosts = []
        }
        queryClient.setQueryData(
          ['posts'],
          previousPosts.filter((post) => post.id !== payload.old.id)
        )
      })
      .subscribe()
    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
}
