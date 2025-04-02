import { useUnit } from "effector-react";
import { $notification,resetNotification,$notificationError } from "../../store/notification";
import { NotificationWrapper } from "../../UI/notification";
import { MainText } from "../../UI/main-text";
export const Notification=() => {
    const notification=useUnit($notification)
    const notificationError=useUnit($notificationError)

    return(
        <NotificationWrapper $error={notificationError} $display={notification.length>0} onClick={()=>resetNotification()}>
            <MainText $fontsize="18px" $color="white">{notification}</MainText>
        </NotificationWrapper>
    )
}