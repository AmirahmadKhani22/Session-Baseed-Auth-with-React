import {Component , type ErrorInfo , type JSX , type ReactNode} from 'react'

type FallbackProps = {
    error: Error; 
    onRetry?: (error?: Error) => void
}

type Props = {
    children: ReactNode;
    fallback?: (props: FallbackProps) => JSX.Element;
}

type State = {
    error: Error | null | undefined;
    hasError: boolean;
}

export class DashboardLayoutErrorBoundary extends Component<Props , State> {
    constructor(props: Props) {
        super(props)
        this.state = {error: undefined, hasError: false}
    }

    static getDerivedStateFromError(error: Error) {
        // state setter when an rendering ui error occur
        return {
            error: {...error},
            hasError: true,
        }
    }

    componentDidCatch(error: Error , info: ErrorInfo) {
        // send error to monitoring services
    }

    handleRetry() {
        this.setState((pervState , props) => ({
            error: null,
            hasError: false,
        }))
    }

    render() {

        if(this.state.hasError) {
            if(!this.props.fallback) {
                return (
                    <div className="w-full h-screen overflow-hidden flex flex-col relative">
                        <div className="flex-1 overflow-y-auto">
                            <div className="min-h-full flex items-center justify-center py-6 px-8">
                                <h1 className='text-indigo-950 text-3xl text-center font-bold'>
                                    Sorry, has just occured an uncaught error!
                                    <br />
                                    Please, call this problem to the support team and try later.
                                </h1>
                            </div>
                        </div>
                    </div>
                )
            }

            const Fallback = this.props.fallback

            return (
                <div className="w-full h-screen overflow-hidden flex flex-col relative">
                    <div className="flex-1 overflow-y-auto">
                        <div className="min-h-full flex items-center justify-center py-6 px-8">
                            <Fallback 
                                error={this.state.error!}
                                onRetry={this.handleRetry}
                            />
                        </div>
                    </div>
                </div>
            )
        }

        return <>{this.props.children}</>
    }
}

export default DashboardLayoutErrorBoundary
