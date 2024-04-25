export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      advertisement: {
        Row: {
          adId: string
          imageUrl: string[] | null
          userId: string
        }
        Insert: {
          adId?: string
          imageUrl?: string[] | null
          userId?: string
        }
        Update: {
          adId?: string
          imageUrl?: string[] | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_advertisement_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'userInfo'
            referencedColumns: ['userId']
          },
        ]
      }
      comment: {
        Row: {
          boardId: string
          commentContent: string
          commentDate: string
          commentId: string
          commentLikeList: string[] | null
          userId: string
        }
        Insert: {
          boardId?: string
          commentContent?: string
          commentDate?: string
          commentId?: string
          commentLikeList?: string[] | null
          userId?: string
        }
        Update: {
          boardId?: string
          commentContent?: string
          commentDate?: string
          commentId?: string
          commentLikeList?: string[] | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_comment_boardId_fkey'
            columns: ['boardId']
            isOneToOne: false
            referencedRelation: 'community'
            referencedColumns: ['boardId']
          },
          {
            foreignKeyName: 'public_comment_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'userInfo'
            referencedColumns: ['userId']
          },
        ]
      }
      community: {
        Row: {
          boardId: string
          boardTitle: string
          content: string
          date: string
          likeCount: number | null
          likeList: string[]
          musicId: string
          userId: string
        }
        Insert: {
          boardId?: string
          boardTitle?: string
          content?: string
          date?: string
          likeCount?: number | null
          likeList: string[]
          musicId?: string
          userId?: string
        }
        Update: {
          boardId?: string
          boardTitle?: string
          content?: string
          date?: string
          likeCount?: number | null
          likeList?: string[]
          musicId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_community_musicId_fkey'
            columns: ['musicId']
            isOneToOne: false
            referencedRelation: 'musicInfo'
            referencedColumns: ['musicId']
          },
          {
            foreignKeyName: 'public_community_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'userInfo'
            referencedColumns: ['userId']
          },
        ]
      }
      musicDislikes: {
        Row: {
          ballad: number | null
          dance: number | null
          hiphop: number
          mbti: number
          rnb: number | null
          rock: number | null
        }
        Insert: {
          ballad?: number | null
          dance?: number | null
          hiphop: number
          mbti?: number
          rnb?: number | null
          rock?: number | null
        }
        Update: {
          ballad?: number | null
          dance?: number | null
          hiphop?: number
          mbti?: number
          rnb?: number | null
          rock?: number | null
        }
        Relationships: []
      }
      musicInfo: {
        Row: {
          artist: string
          genre: number
          lyrics: string
          musicId: string
          musicSource: string
          musicTitle: string
          release: string
          runTime: string
          thumbnail: string
        }
        Insert: {
          artist: string
          genre: number
          lyrics?: string
          musicId?: string
          musicSource?: string
          musicTitle?: string
          release: string
          runTime?: string
          thumbnail?: string
        }
        Update: {
          artist?: string
          genre?: number
          lyrics?: string
          musicId?: string
          musicSource?: string
          musicTitle?: string
          release?: string
          runTime?: string
          thumbnail?: string
        }
        Relationships: []
      }
      musicPreferences: {
        Row: {
          ballad: number | null
          dance: number | null
          hiphop: number
          mbti: number
          rnb: number | null
          rock: number | null
        }
        Insert: {
          ballad?: number | null
          dance?: number | null
          hiphop: number
          mbti?: number
          rnb?: number | null
          rock?: number | null
        }
        Update: {
          ballad?: number | null
          dance?: number | null
          hiphop?: number
          mbti?: number
          rnb?: number | null
          rock?: number | null
        }
        Relationships: []
      }
      personalMusic: {
        Row: {
          personalMusicId: string
          result: string[]
          resultSentence: string
          userId: string
        }
        Insert: {
          personalMusicId?: string
          result?: string[]
          resultSentence: string
          userId?: string
        }
        Update: {
          personalMusicId?: string
          result?: string[]
          resultSentence?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_personalMusic_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'userInfo'
            referencedColumns: ['userId']
          },
        ]
      }
      playlistCurrent: {
        Row: {
          currentId: string
          currentMusicIds: Json[] | null
          userId: string
        }
        Insert: {
          currentId?: string
          currentMusicIds?: Json[] | null
          userId?: string
        }
        Update: {
          currentId?: string
          currentMusicIds?: Json[] | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_playlistCurrent_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'userInfo'
            referencedColumns: ['userId']
          },
        ]
      }
      playlistMy: {
        Row: {
          myMusicIds: string[] | null
          playlistId: string
          userId: string
        }
        Insert: {
          myMusicIds?: string[] | null
          playlistId?: string
          userId?: string
        }
        Update: {
          myMusicIds?: string[] | null
          playlistId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_playlistMy_userId_fkey'
            columns: ['userId']
            isOneToOne: false
            referencedRelation: 'userInfo'
            referencedColumns: ['userId']
          },
        ]
      }
      providerUserInfo: {
        Row: {
          email: string
          follower: string[]
          following: string[]
          likedPostsOpen: boolean
          mbtiOpen: boolean
          nickname: string | null
          password: string | null
          personalMusicOpen: boolean
          playlistOpen: boolean
          postsOpen: boolean
          userChar: Json
          userId: string
          userImage: string | null
          userType: number
        }
        Insert: {
          email?: string
          follower: string[]
          following: string[]
          likedPostsOpen?: boolean
          mbtiOpen?: boolean
          nickname?: string | null
          password?: string | null
          personalMusicOpen?: boolean
          playlistOpen?: boolean
          postsOpen?: boolean
          userChar: Json
          userId?: string
          userImage?: string | null
          userType?: number
        }
        Update: {
          email?: string
          follower?: string[]
          following?: string[]
          likedPostsOpen?: boolean
          mbtiOpen?: boolean
          nickname?: string | null
          password?: string | null
          personalMusicOpen?: boolean
          playlistOpen?: boolean
          postsOpen?: boolean
          userChar?: Json
          userId?: string
          userImage?: string | null
          userType?: number
        }
        Relationships: []
      }
      userInfo: {
        Row: {
          email: string
          follower: string[]
          following: string[]
          likedPostsOpen: boolean
          mbtiOpen: boolean
          nickname: string
          password: string
          personalMusicOpen: boolean
          playlistOpen: boolean
          postsOpen: boolean
          socialUserId: string | null
          userChar: Json
          userId: string
          userImage: string | null
          userType: number
        }
        Insert: {
          email?: string
          follower: string[]
          following: string[]
          likedPostsOpen?: boolean
          mbtiOpen?: boolean
          nickname?: string
          password?: string
          personalMusicOpen?: boolean
          playlistOpen?: boolean
          postsOpen?: boolean
          socialUserId?: string | null
          userChar: Json
          userId?: string
          userImage?: string | null
          userType?: number
        }
        Update: {
          email?: string
          follower?: string[]
          following?: string[]
          likedPostsOpen?: boolean
          mbtiOpen?: boolean
          nickname?: string
          password?: string
          personalMusicOpen?: boolean
          playlistOpen?: boolean
          postsOpen?: boolean
          socialUserId?: string | null
          userChar?: Json
          userId?: string
          userImage?: string | null
          userType?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
