import React from 'react';
import {
  Icon,
  Sidebar,
  Segment,
  Menu,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TransitComponent from '@databraid/transit-widget/lib/App';
import SlackComponent from '@databraid/slack-widget/lib/App';
import GithubComponent from '@databraid/github-widget/lib/App';
import SheetsComponent from '@databraid/sheets-widget/lib/App';
import {
  TRANSIT_WIDGET_ID,
  SLACK_WIDGET_ID,
  GITHUB_WIDGET_ID,
  SHEETS_WIDGET_ID,
} from '../../constants';
import {
  removeWidget,
  showWidgetSidebar,
  hideWidgetSidebar,
} from '../../actions';
import WidgetSidestrip from '../WidgetSidestrip/';


const WidgetContainer = (props) => {
  let component;
  if (props.id === TRANSIT_WIDGET_ID) {
    component = <TransitComponent widgetId={props.id} />;
  } else if (props.id === GITHUB_WIDGET_ID) {
    component = <GithubComponent widgetId={props.id} />;
  } else if (props.id === SLACK_WIDGET_ID) {
    component = <SlackComponent widgetId={props.id} />;
  } else if (props.id === SHEETS_WIDGET_ID) {
    component = <SheetsComponent widgetId={props.id} />;
  }

  return (
    <div className="widget">
      {props.locked ? null : <WidgetSidestrip id={props.id} />}

      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          direction="right"
          visible={props.showSidebar}
          icon="labeled"
          vertical
          inverted
        >
          <Menu.Item name="delete-widget" onClick={() => props.removeWidget(props.id)}>
            <Icon name="remove" />
            Delete
          </Menu.Item>
          <Menu.Item name="settings" disabled>
            <Icon name="tasks" />
            Configs
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            {component}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

WidgetContainer.propTypes = {
  id: PropTypes.string.isRequired,
  showSidebar: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  removeWidget: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  const showSidebar = state.widgets.metadata[ownProps.id].showSidebar;
  const locked = state.widgets.locked;
  return { id, showSidebar, locked };
};

export const mapDispatchToProps = dispatch => bindActionCreators({
  removeWidget,
  showWidgetSidebar,
  hideWidgetSidebar,
},
dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetContainer);
