import { NextRequest, NextResponse } from "next/server";
import { parse } from 'url';

// export function middleware(request: NextRequest) {
//   const parsedUrl = parse(request.url!, true);
//   const { pathname, query } = parsedUrl;

//   // Extract the fragment identifier if it exists
//   const hashIndex = request.url!.indexOf('#');
//   const hash = hashIndex !== -1 ? request.url!.slice(hashIndex) : '';

//   // Check if user agent is mobile
//   const isMobile = /mobile/i.test(request.headers.get('user-agent')!);

//   // If pathname is root ("/")
//   if (pathname === '/') {
//     // Prepare the new location
//     // const newLocation = {
//     //   pathname: isMobile ? '/m' : '/d',
//     //   query: query,
//     //   hash: hash
//     // };

//     const newURL = new URL(isMobile ? '/m' : '/d', request.url!);
//     newURL.hash = hash;
//     // newURL.search = parsedUrl.query.toString();  

//     // write the new url to the console
//     console.log(newURL.toString());

//     // Redirect to the new location with the original query parameters and fragment identifier
//     // request.writeHead(302, { Location: format(newLocation) });
//     // return NextResponse.rewrite(newURL.toString());
//     return NextResponse.redirect(newURL.toString());
//   } else {
//     // If pathname is not root, continue with the request
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: [
//     '/((?!m).*)',
//   ]
// }