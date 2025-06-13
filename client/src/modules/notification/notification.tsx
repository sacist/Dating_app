import { useUnit } from "effector-react";
import { $notification,resetNotification,$background } from "../../store/notification";
import { NotificationWrapper } from "../../UI/shared/notification";
import { MainText } from "../../UI/main-text";
export const Notification=() => {
    const notification=useUnit($notification)
    const background=useUnit($background)
    return(
        <NotificationWrapper 
        $display={notification.length>0}
        onClick={()=>resetNotification()}
        $specialBackground={background}>
            <MainText $fontsize="18px" $color="white">{notification}</MainText>
        </NotificationWrapper>
    )
}