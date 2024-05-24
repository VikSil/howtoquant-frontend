import { useState } from 'react';

import GreenForm from '../../containers/GreenForm';
import { getGenericRequest } from '../../../utils/api_get';
import { postOrganizations } from '../../../utils/api_post';

export default function OrganizationAdd(props) {
  const { orgType } = props;

  const [orgShortName, setOrgShortName] = useState('');
  const [orgLongName, setOrgLongName] = useState('');
  const [orgDescr, setOrgDescr] = useState('');
  const [orgOwnerName, setOrgOwnerName] = useState('');
  const [orgOwnerId, setOrgOwnerId] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submitOrgData = () => {
    setButtonDisabled(true);
    setPostResponse('');
    const data = {
      'org_type': orgType,
      'name': orgShortName,
      'long_name': orgLongName,
      'description': orgDescr,
      'owner_org': orgOwnerName,
    };
    postOrganizations(data)
      .then((data) => {
        if (data.status === 'OK') {
          setPostResponse('Saved successfully');
          setOrgShortName('');
          setOrgLongName('');
          setOrgDescr('');
          setOrgOwnerId('');
        } else {
          setPostResponse(data.data);
        }
        setButtonDisabled(false);
      })
      .catch((error) => {
        setPostResponse(error);
      });
  };

  const ChangeControler = (id, text) => {
    setOrgOwnerName(text);
    setOrgOwnerId(id);
  };

  const orgData = [
    {
      'type': 'textbox',
      'props': {
        'text': 'Short Name',
        'labelLocation': 'left-apart',
        'id': 'org-short-name-input',
        'mandatory': true,
        'value': orgShortName,
        'onChange': setOrgShortName,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Long Name',
        'labelLocation': 'left-apart',
        'id': 'org-long-name-input',
        'value': orgLongName,
        'onChange': setOrgLongName,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Description',
        'labelLocation': 'left-apart',
        'id': 'org-description-input',
        'value': orgDescr,
        'onChange': setOrgDescr,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Parent Organization',
        'labelLocation': 'left-apart',
        'id': 'org-parent-select',
        'fetchFunction': getGenericRequest,
        'fetchKey': orgType === 'Fund' ? 'fund_names' : 'org_names',
        'fetchParams': orgType === 'Fund' ? 'fund_names' : 'parent_org_names',
        'currentValue': orgOwnerId,
        'onChange': ChangeControler,
      },
    },
    {
      'type': 'button',
      'props': {
        'text': 'Save',
        'id': 'org-save-btn',
        'btntype': 'submit',
        'isDisabled': buttonDisabled,
      },
    },
  ];

  return (
    <GreenForm
      formTitle={orgType === 'Fund' ? 'New Fund' : 'New Broker'}
      formList={orgData}
      onSubmit={submitOrgData}
      submitResult={postResponse}
    />
  );
}
