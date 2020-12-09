import { storiesOf } from "@storybook/react";
import React from "react";

import { EmailLink } from ".";

storiesOf("@components/atoms/EmailLink", module)
  .addParameters({ component: EmailLink })
  .add("EmailLink", () =>
    <EmailLink link='jose@juan.com'/>
    )
  .add("EmailLink custom title", () =>
    <EmailLink link='jose@juan.com' title='Jose email'/>
  )
  .add("EmailLink no icon", () =>
    <EmailLink link='jose@juan.com' title='Jose email' showIcon={false}/>
  );
