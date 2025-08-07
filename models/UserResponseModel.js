import { formatDate } from "../utils/dateFormater.js"

export const userResponse = (list) => {
    return(
        {
            success: true,
            users: list.map((ele, int)=>({
                id: ele.id,
                username: ele.unsername,
                email: ele.email,
                avatar_url: ele.avatar_url,
                status: ele.status,
                last_seen: formatDate(ele.last_seen)
            }))
        }
    )
}