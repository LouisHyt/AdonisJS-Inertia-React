import { Subscription, Transmit } from '@adonisjs/transmit-client'
import { Head, usePage } from '@inertiajs/react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import type { SharedProps } from '@adonisjs/inertia/types'

type TransmitData = {
  message: string
  userUid: string
  user: {
    username: string
    avatarUrl: string
  }
  sentAt: string
}

function feed() {
  const subscription = useRef<Subscription>(null)
  const userUid = useRef<string>(null)
  const [messages, setMessages] = useState<TransmitData[]>([])

  const { _csrf, user } = usePage<SharedProps>().props

  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: 'http://localhost:3333',
    })

    userUid.current = transmit.uid

    const transmitSubscribe = async () => {
      subscription.current = transmit.subscription('chat/1')
      await subscription.current.create()

      subscription.current.onMessage((data: TransmitData) => {
        setMessages((messages) => [data, ...messages])
      })
    }

    transmitSubscribe()

    return () => {
      subscription.current?.delete()
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const message = form.get('message')
    e.currentTarget.reset()
    fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _csrf,
        message,
        user: {
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
        userUid: userUid.current,
      }),
    })
  }

  return (
    <>
      <Head title="Feed" />
      <div className="min-w-[700px] p:2 sm:p-6 grid grid-rows-[1fr_auto] h-full">
        <div
          id="messages"
          className="flex flex-col-reverse gap-2 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {messages.map((data, index) => {
            const isCurrentUser = data.userUid === userUid.current
            return (
              <div className="chat-message" key={index}>
                <div className={`flex items-end ${isCurrentUser ? 'justify-end' : ''} mb-4`}>
                  <div
                    className={`flex flex-col space-y-2 text-base max-w-xs mx-2 ${isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}
                  >
                    <div className="user-info flex items-center space-x-2 mb-1">
                      <img
                        className="w-8 h-8 rounded-full object-cover shadow-sm"
                        src={data.user.avatarUrl}
                        alt={data.user.username}
                      />
                      <span className="text-sm font-medium text-gray-600">
                        {data.user.username}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`px-4 py-2 rounded-lg inline-block shadow-sm ${
                          isCurrentUser
                            ? 'rounded-br-none bg-blue-600 text-white'
                            : 'rounded-bl-none bg-gray-100 text-gray-800'
                        }`}
                      >
                        {data.message}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">{data.sentAt}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <form className="relative flex" onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default feed
