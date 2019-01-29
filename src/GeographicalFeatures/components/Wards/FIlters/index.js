import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const categories = [
  'Aerialway',
  'Aeroway',
  'Amenity',
  'Barrier',
  'Boundary',
  'Building',
  'Craft',
  'Emergency',
  'Geological',
  'Highway',
  'Historic',
  'Landuse',
  'Leisure',
  'Man made',
  'Military',
  'Natural',
  'Office',
  'Other',
  'Place',
  'Power',
  'Public',
  'Railway',
  'Route',
  'Shop',
  'Sport',
  'Telecom',
  'Tourism',
  'Transport',
  'Waterway',
];
const types = [
  'Access Control',
  'Accommodation',
  'Administrative',
  'Arts',
  'Assembly Point',
  'Civic',
  'Commercial',
  'Culture',
  'Education',
  'Entertainment',
  'Facilities',
  'Financial',
  'Firefighters',
  'Healthcare',
  'Landform',
  'Lifecycle',
  'Lifeguards',
  'Linear Barriers',
  'Link Roads',
  'Medical Rescue',
  'Other',
  'Paths',
  'Religious',
  'Roads',
  'Stations',
  'Stops',
  'Sustenance',
  'Tracks',
  'Transportation',
  'Vegetation',
  'Warehouse',
  'Water',
  'Watercourses',
  'Waterways',
];
const levels = [
  'zone',
  'region',
  'district',
  'division',
  'ward',
  'village',
  'shina',
  'other',
];

/**
 * Filter modal component for filtering wards
 *
 * @class
 * @name WardsFilters
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class WardsFilters extends Component {
  static propTypes = {
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    // const {
    //   form: { validateFields },
    // } = this.props;

    // validateFields((error, values) => {
    //   const filter = {
    //     type: { $in: values.types },
    //     phases: { $in: phases.phases },
    //   };
    // });
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} layout={formItemLayout}>
        {/* start wards type filters */}
        <Form.Item {...formItemLayout} label="By type">
          {getFieldDecorator('types')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {types.map(type => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={type}>{type}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end wards type filters */}

        {/* start category filters */}
        <Form.Item {...formItemLayout} label="By Categories">
          {getFieldDecorator('categories')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {categories.map(category => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={category}>{category}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end category filters */}
        {/* start level filters */}
        <Form.Item {...formItemLayout} label="By Levels">
          {getFieldDecorator('levels')(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {levels.map(level => (
                  <Col span={6} style={{ margin: '10px 0' }}>
                    <Checkbox value={level}>{level}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end level filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            Filter
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}
export default Form.create()(WardsFilters);