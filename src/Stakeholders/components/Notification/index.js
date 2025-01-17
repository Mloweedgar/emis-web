import { Connect, getFocalPeople } from '@codetanzania/emis-api-states';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Topbar from '../../../components/Topbar';
import NotificationList from './List';

import './styles.css';

/* constants */

/**
 * @class
 * @name Notification
 * @description Render focalPeople list which have search box, actions and focalPeople list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Notification extends Component {
  // state = {
  //   showFilters: false,
  //   isEditForm: false,
  //   showNotificationForm: false,
  //   selectedFocalPeople: [],
  //   notificationBody: undefined,
  //   cached: null,
  // };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // posting: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string })
    ).isRequired,
    // focalPeople: PropTypes.shape({ name: PropTypes.string }),
    page: PropTypes.number.isRequired,
    // showForm: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    // focalPeople: null,
    searchQuery: undefined,
  };

  componentDidMount() {
    getFocalPeople();
  }

  render() {
    const { notifications, loading, page, searchQuery, total } = this.props;
    return (
      <Fragment>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for notifications here ...',
            onChange: this.searchFocalPeople,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Notification',
              icon: 'plus',
              size: 'large',
              title: 'Add Notification',
              onClick: this.openFocalPersonForm,
            },
          ]}
        />
        {/* end Topbar */}

        <div className="NotificationList">
          {/* list starts */}
          <NotificationList
            total={total}
            page={page}
            notifications={notifications}
            loading={loading}
            onEdit={this.handleEdit}
            onFilter={this.openFiltersModal}
            onNotify={this.openNotificationForm}
          />
          {/* end list */}
        </div>
      </Fragment>
    );
  }
}

export default Connect(Notification, {
  searchQuery: 'focalPeople.q',
  notifications: 'focalPeople.list',
  // notification: 'focalPeople.selected',
  loading: 'focalPeople.loading',
  // posting: 'focalPeople.posting',
  page: 'focalPeople.page',
  showForm: 'focalPeople.showForm',
  total: 'focalPeople.total',
});
