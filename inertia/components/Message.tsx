type Message = {
  message: string
}

function Message({ message }: Message) {
  return <div>{message}</div>
}

export default Message
