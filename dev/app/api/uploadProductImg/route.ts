import { auth } from "@/auth";
import { Role } from "@/config/constants";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export const POST = auth(async (request) => {
  if (!request.auth) {
    return new Response(undefined, { status: 403 });
  }
  if (
    !request.auth.user.roles.includes(Role.WRITER) &&
    !request.auth.user.roles.includes(Role.ADMIN)
  ) {
    return new Response(undefined, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (clientPayload) =>
        /* clientPayload */
        {
          return {
            allowedContentTypes: ["image/jpeg", "image/png"],
            tokenPayload: clientPayload,
          };
        },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
});
