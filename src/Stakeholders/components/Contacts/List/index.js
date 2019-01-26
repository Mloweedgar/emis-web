import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ContactsListHeader from '../ListHeader';
import ContactsListItem from '../ListItem';

const ContactsList = ({ contacts, loading }) => (
  <Fragment>
    <ContactsListHeader />
    <List
      loading={loading}
      dataSource={contacts}
      renderItem={contact => (
        <ContactsListItem
          key={contact.abbreviation}
          abbreviation={contact.abbreviation}
          name={contact.name}
          title={contact.title}
          email={contact.email}
          mobile={contact.mobile}
        />
      )}
    />
  </Fragment>
);

ContactsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default ContactsList;