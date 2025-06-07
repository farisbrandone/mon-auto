import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CardDescription({
  descriptionAuto,
}: {
  descriptionAuto: string;
}) {
  return (
    <Card className="w-full mt-2 py-0 border-x-[#33333373] border-b-[#33333371] rounded-t-[0] gap-2 ">
      <CardHeader className="w-full bg-[#333333] text-white p-2.5  rounded-b-md">
        <CardTitle className="text-[18px] "> Description de l'auto</CardTitle>
        {/*  <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent className="text-wrap pb-2 font-bold">
        {" "}
        <pre>{descriptionAuto}</pre>{" "}
      </CardContent>
    </Card>
  );
}
