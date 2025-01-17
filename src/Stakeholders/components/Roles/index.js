import {
  Connect,
  getRoles,
  openRoleForm,
  selectRole,
  closeRoleForm,
} from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RoleFilters from './Filters';
import RoleList from './List';
import RoleForm from './Form';
import NotificationForm from './NotificationForm';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name Roles
 * @description Render role module which has search box, actions and list of roles
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Roles extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedRoles: [],
    notificationBody: undefined,
  };

  static propTypes = {
    showForm: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    role: PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      description: PropTypes.string,
    }),
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        abbreviation: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
  };

  static defaultProps = {
    role: null,
  };

  componentWillMount() {
    getRoles();
  }

  /**
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property to false via state
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible property to false via state
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * @function
   * @name openForm
   * @description Open role form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openRoleForm();
  };

  /**
   * @function
   * @name openForm
   * @description close role form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closeRoleForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchRoles
   * @description Search Roles List based on supplied filter word
   *
   * @param {Object} event Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchRoles = event => {
    getRoles({ q: event.target.value });
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {Object} role - role to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = role => {
    selectRole(role);
    this.setState({ isEditForm: true });
    openRoleForm();
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify contacts
   *
   * @param {Object[]} role List of contacts selected to be notified
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = role => {
    this.setState({
      selectedRoles: role,
      showNotificationForm: true,
    });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify contacts
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeNotificationForm = () => {
    this.setState({ showNotificationForm: false });
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description Performs after close form cleanups
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const { roles, loading, showForm, posting, page, total, role } = this.props;
    const {
      showFilters,
      isEditForm,
      showNotificationForm,
      selectedRoles,
      notificationBody,
    } = this.state;
    return (
      <div className="RoleList">
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Search
              size="large"
              placeholder="Search for roles here ..."
              onChange={this.searchRoles}
              allowClear
              title="Search roles"
              className="SearchBox"
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Row type="flex" justify="end">
              <Col xxl={6} xl={6} lg={6} md={8} sm={24} xs={24}>
                <Button
                  block
                  type="primary"
                  icon="plus"
                  size="large"
                  title="Add new role"
                  onClick={this.openForm}
                >
                  New Role
                </Button>
              </Col>
            </Row>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <RoleList
          roles={roles}
          loading={loading}
          onEdit={this.handleEdit}
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
          onNotify={this.openNotificationForm}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Roles"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          maskClosable={false}
          destroyOnClose
          footer={null}
        >
          <RoleFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* Notification Modal modal */}
        <Modal
          title="Notify according to roles"
          visible={showNotificationForm}
          onCancel={this.closeNotificationForm}
          footer={null}
          destroyOnClose
          maskClosable={false}
          width="40%"
          afterClose={this.handleAfterCloseNotificationForm}
        >
          <NotificationForm
            onCancel={this.closeNotificationForm}
            recipients={selectedRoles}
            body={notificationBody}
          />
        </Modal>
        {/* end Notification modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Role' : 'Add New Role'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <RoleForm
            posting={posting}
            isEditForm={isEditForm}
            role={role}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Roles, {
  roles: 'roles.list',
  role: 'roles.selected',
  showForm: 'roles.showForm',
  posting: 'roles.posting',
  loading: 'roles.loading',
  page: 'roles.page',
  total: 'roles.total',
});
