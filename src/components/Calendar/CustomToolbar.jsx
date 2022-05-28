import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ToolbarDateHeader from './ToolbarDateHeader.component';
import { Icon, Button, ButtonGroup, ButtonToolbar } from '../app';

const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE'
};

const propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};

export default class CustomToolbar extends Component {
  static propTypes = propTypes;
  render() {
    let {
      localizer: { messages },
      label,
      date
    } = this.props;

    return (
      <ButtonToolbar>
        <ButtonGroup>
          <Button onClick={this.navigate.bind(null, navigate.TODAY)}>
            {messages.today}
          </Button>
          <Button onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
            <Icon glyph="caret-left" />
          </Button>
          <Button onClick={this.navigate.bind(null, navigate.NEXT)}>
            <Icon glyph="caret-right" />
          </Button>
        </ButtonGroup>

        <ToolbarDateHeader date={date} onChange={this.toThisDay}>
          {label}
        </ToolbarDateHeader>

        <ButtonGroup className="pull-right">
          {this.viewNamesGroup(messages)}
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  toThisDay = date => {
    this.props.onView('day');
    // give it just a tick to 'set' the view, prior to navigating to the proper date
    setTimeout(() => {
      this.props.onNavigate(navigate.DATE, date);
    }, 100);
  };

  navigate = action => {
    this.props.onNavigate(action);
  };

  view = view => {
    this.props.onView(view);
  };

  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <Button
          key={name}
          className={cn({
            active: view === name,
            'btn-primary': view === name
          })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </Button>
      ));
    }
  }
}