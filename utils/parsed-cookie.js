import cookie from 'cookie'

export default function ParsedCookie(req, res) {
    if(!req.headers.cookie){
        res.setHeader("location", "/");
         res.statusCode = 302;
         res.end();
        return "sem cookie"
    }
    const parsedCookie = cookie.parse(req.headers.cookie)
    const user = JSON.parse(parsedCookie.user)
    // if (!parsedCookie.user) {
    //     res.setHeader("location", "/");
    //     res.statusCode = 302;
    //     res.end();
    // }
    return user
}