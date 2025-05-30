import { $chat, $inputHeight } from "../../store/chat-store"
import { MessagesWrapper, ChatWrapper } from "../../UI/chat/chat-main"
import { useUnit } from "effector-react"
import { MessageItem } from "../../components/chat/message-item"
import { fetchChatFx } from "../../store/chat-store";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ErrorChatMessage } from "../../UI/chat/chat-error-message";
import { MessageInput } from "./chat-input";
import { $socket } from "../../store/websocket/websocket-events";

export const Chat = () => {
    const chatData = useUnit($chat)
    const { nickname } = useParams()
    const socket = useUnit($socket)
    const scrollIntoViewRef = useRef<HTMLDivElement>(null)
    const inputHeight = useUnit($inputHeight)

    useEffect(() => {
        if (!nickname || !socket) return
        socket.emit('join-profile', nickname)
        const controller = new AbortController()
        const signal = controller.signal
        fetchChatFx({ nickname, signal })
        return () => {
            socket.emit('leave-profile', nickname)
            controller.abort()
        }
    }, [nickname, socket])
    useEffect(() => {
        if (scrollIntoViewRef) {
            scrollIntoViewRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [chatData])
    useEffect(() => {
        const roomId =
            chatData && 'messages' in chatData
                ? chatData?.messages[0]?.chat_room_id
                : chatData?.chatId;
        socket?.emit('enter-chat', roomId)

        return () => {
            socket?.emit('leave-chat', roomId)
        }
    }, [chatData && 'messages' in chatData ? chatData?.messages[0]?.chat_room_id : chatData?.chatId])
    return (
        <ChatWrapper>
            <MessagesWrapper $inputheight={inputHeight}>
                {chatData && 'error' in chatData ?
                    <ErrorChatMessage $fontsize="22px">{chatData.error}</ErrorChatMessage>
                    :
                    chatData && 'messages' in chatData &&
                    chatData.messages.map((message, ind, messages) => (
                        <MessageItem
                            myMessage={message.myMessage}
                            key={message.id}
                            messageText={message.message}
                            lastInSeq={messages[ind + 1]?.user_id !== message.user_id || !messages[ind + 1]}
                            firstInSeq={(messages[ind - 1]?.user_id !== message.user_id || !messages[ind - 1]) && ind !== 0}
                        />
                    ))
                }
                <div ref={scrollIntoViewRef} />
            </MessagesWrapper>
            <MessageInput key={nickname} />
        </ChatWrapper>
    )
}

