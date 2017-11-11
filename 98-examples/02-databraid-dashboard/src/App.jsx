import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactGridLayout from 'react-grid-layout';
import { Icon, Sidebar, Segment, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './App.css';
import {
  showAddWidgetModal,
  showDashboardSidebar,
  hideDashboardSidebar,
  lockDashboard,
  unlockDashboard,
  saveLayoutChange,
} from './actions';
import ModalAddWidget from './components/ModalAddWidget/';
import WidgetContainer from './components/WidgetContainer/';

const Grid = ReactGridLayout.WidthProvider(ReactGridLayout);

export const AppComponent = (props) => {
  const components = (props.ids).map(widgetId => (
    <div key={widgetId} className="widget-container">
      <WidgetContainer id={widgetId} />
    </div>
  ));

  return (
    <div className="page-container">
      <div
        role="link"
        tabIndex="-1"
        className="side-strip"
        onClick={props.showSidebar ? props.hideDashboardSidebar : props.showDashboardSidebar}
      >
        <Icon name={props.showSidebar ? 'chevron right' : 'ellipsis vertical'} />
      </div>
      <div className="grid-container">
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
            <Menu.Item name="add_widget" onClick={props.showAddWidgetModal}>
              <Icon name="add circle" />
              Add Widget
            </Menu.Item>
            {props.ids.length ?
              <Menu.Item
                name="lock-unlock-dashboard"
                onClick={props.locked ? props.unlockDashboard : props.lockDashboard}
              >
                <Icon name={props.locked ? 'unlock' : 'lock'} />
                {props.locked ? 'Unlock' : 'Lock'}
              </Menu.Item>
              : null }
            <Menu.Item name="settings" disabled>
              <Icon name="setting" />
              Settings
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>

              <Grid
                verticalCompact={false}
                className="layout"
                layout={props.layout}
                margin={[2, 2]}
                cols={12}
                rowHeight={30}
                width={1200}
                onLayoutChange={(layout) => { props.saveLayoutChange(layout); }}
              >
                {components}
              </Grid>

            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
      <ModalAddWidget />
    </div>
  );
};

AppComponent.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  layout: PropTypes.arrayOf(PropTypes.shape({
    i: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
    static: PropTypes.bool,
  })).isRequired,
  showSidebar: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  showAddWidgetModal: PropTypes.func.isRequired,
  showDashboardSidebar: PropTypes.func.isRequired,
  hideDashboardSidebar: PropTypes.func.isRequired,
  lockDashboard: PropTypes.func.isRequired,
  unlockDashboard: PropTypes.func.isRequired,
  saveLayoutChange: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  const ids = state.widgets.ids;
  const layout = state.widgets.grid.layout;
  const showSidebar = state.widgets.showSidebar;
  const locked = state.widgets.locked;
  return { ids, layout, showSidebar, locked };
};

export const mapDispatchToProps = dispatch => bindActionCreators({
  showAddWidgetModal,
  showDashboardSidebar,
  hideDashboardSidebar,
  lockDashboard,
  unlockDashboard,
  saveLayoutChange,
},
dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);
