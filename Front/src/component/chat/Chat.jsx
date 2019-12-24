import React from 'react';
import ErrorBoundary from 'react-error-boundary-component-fallback2';
import ChatMessageBox from './ChatMessageBox/ChatMessageBox';

class Chat extends React.Component {

    refreshPage() {
        window.location.reload();
    }

    render () {
        return (
            <ErrorBoundary headerColor="lightseagreen" errorTitle="Server Error" 
            errorText="Unable to not connect you to the Chat Room Server. Please refresh this page and try again!" 
            buttonType={['', 'primary', '', '']} buttonLabel={['', 'Refresh', '', '']} modal={true} autoScrollBodyContent={false}
            customContentStyle={null} onClick={this.refreshPage}>
              <ChatMessageBox />
            </ErrorBoundary>
        )
    }
}
export default Chat;