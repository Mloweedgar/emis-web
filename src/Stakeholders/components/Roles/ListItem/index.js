import { Avatar, Checkbox, Col, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import randomColor from 'randomcolor';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

const { confirm } = Modal;
const sideSpan = { xxl: 1, xl: 1, lg: 1, md: 2, sm: 3, xs: 3 };
const nameSpan = { xxl: 7, xl: 7, lg: 7, md: 7, sm: 16, xs: 16 };
const abbreviationSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 };
const descriptionSpan = { xxl: 11, xl: 11, lg: 11, md: 10, sm: 0, xs: 0 };
const isHoveredSpan = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 };

/**
 * @class
 * @name RoleListItem
 * @description Single role list item component. Render single role details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class RoleListItem extends Component {
  state = {
    isHovered: false,
  };

  /* props validation */
  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on mouse enter role list item
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  /**
   * @function
   * @name handleMouseLeave
   * @description Handle on mouse leave role list item
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  /**
   * @function
   * @name handleToggleSelect
   * @description Handle Toggling List Item checkbox
   *
   * @param {Object} event - Event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleToggleSelect = event => {
    const { isSelected } = this.state;
    const { onSelectItem, onDeselectItem } = this.props;

    this.setState({ isSelected: !isSelected });
    if (event.target.checked) {
      onSelectItem();
    } else {
      onDeselectItem();
    }
  };

  /**
   * @function
   * @name showArchiveConfirm
   * @description show confirm modal before archiving a role
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  showArchiveConfirm = () => {
    const { name, onArchive } = this.props;
    confirm({
      title: `Are you sure you want to archive ${name} ?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onArchive();
      },
    });
  };

  render() {
    const { abbreviation, name, description, onEdit } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    let sideComponent = null;
    const avatarBackground = randomColor();

    if (isSelected) {
      sideComponent = (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      );
    } else {
      sideComponent = isHovered ? (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      ) : (
        <Avatar style={{ backgroundColor: avatarBackground }}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
      );
    }

    return (
      <div
        className="RoleListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col {...sideSpan}>{sideComponent}</Col>
          <Col {...nameSpan} title="Role name">
            {name}
          </Col>
          <Col {...abbreviationSpan} title="role abbreviation ">
            {abbreviation}
          </Col>
          <Col {...descriptionSpan} title="Role summary">
            {description}
          </Col>
          <Col {...isHoveredSpan}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Role',
                  title: 'Update Role Details',
                  onClick: onEdit,
                }}
                archive={{
                  name: 'Archive Role',
                  title: 'Remove Role from the list of active Roles',
                  onClick: this.showArchiveConfirm,
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default RoleListItem;
