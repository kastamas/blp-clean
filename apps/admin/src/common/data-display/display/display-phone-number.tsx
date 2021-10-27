import * as React from 'react';
import { parsePhoneNumber } from 'libphonenumber-js';
import { InlineLinkExternal } from '../link/inline-link-external';

interface IComponentProps {
  phone?: string;
  withLink?: boolean;
}

export const DisplayPhoneNumber: React.FC<IComponentProps> = ({
  phone,
  withLink,
}) => {
  if (phone) {
    const phoneNumber = parsePhoneNumber(phone, 'RU');

    if (phoneNumber) {
      if (withLink) {
        return (
          <InlineLinkExternal href={phoneNumber.getURI()}>
            {phoneNumber.formatNational()}
          </InlineLinkExternal>
        );
      }

      return <>{phoneNumber.formatNational()}</>;
    }
  }

  return <>—</>;
};
