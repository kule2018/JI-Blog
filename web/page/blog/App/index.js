import React, { Component } from 'react';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import Axios from 'axios';
import Loadable from 'react-loadable';
import ScrollToTop from '../../../components/ScrollToTop';
// import Articles from '../Articles';
const Articles = Loadable({
    loader: () => import('../Articles'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.namedExport;
        return <Component {...props}/>;
    }
});
// import Article from '../Article';
const Article = Loadable({
    loader: () => import('../Article'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.namedExport;
        return <Component {...props}/>;
    }
});
// import Photoes from '../Photoes';
const Photoes = Loadable({
    loader: () => import('../Photoes'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.namedExport;
        return <Component {...props}/>;
    }
});
// import About from '../About';
const About = Loadable({
    loader: () => import('../About'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.namedExport;
        return <Component {...props}/>;
    }
});
// import Travel from '../Travel';
const Travel = Loadable({
    loader: () => import('../Travel'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.namedExport;
        return <Component {...props}/>;
    }
});
// import Books from '../Books';
const Books = Loadable({
    loader: () => import('../Books'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.namedExport;
        return <Component {...props}/>;
    }
});
import Header from '../Header';
import Footer from '../Footer';
// import Message from '../Message';
const Message = Loadable({
    loader: () => import('../Message'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.namedExport;
        return <Component {...props}/>;
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        const { InitData } = props;
        this.state = {
            InitData,
            reflow: false
        };
    }

    componentDidMount() {
        if (process.env.NODE_ENV == 'production') {
            Axios.post('/api/push/baidu', {
                url: window.location.href
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.location.pathname !== prevProps.location.pathname)) {
            window.scrollTo(0, 0);
            window._hmt && _hmt.push(['_trackPageview', this.props.location.pathname]);
        }

        let titleMap = {
            '/travel': '游记  - 「JI · 记小栈」',
            '/books': '阅记  - 「JI · 记小栈」',
            '/photoes': '图记  - 「JI · 记小栈」',
            '/about': '关于  - 「JI · 记小栈」',
            '/message': '言记  - 「JI · 记小栈」',
            '/': '游走在技术与艺术边缘地带的前端攻城狮 - 「JI · 记小栈」'
        };

        document.title = titleMap[this.props.location.pathname] || '「JI · 记小栈」';

        if (process.env.NODE_ENV == 'production') {
            Axios.post('/api/push/baidu', {
                url: window.location.href
            });
        }
    }

    render() {
        const { minHeight, InitData, reflow } = this.state;
        const { location, match } = this.props;
        const currentKey = location.pathname.split('/')[1] || '/';
        const timeout = 500;
        return (
        <div className="page">
            <Header location={location} />
            <TransitionGroup className="page-main" component='main' id="main" >
                <CSSTransition key={currentKey} timeout={timeout} classNames="slide">
                    <Switch location={location}>
                        <Route path="/" exact={true} render={ props=> (<Articles {...props} {...InitData} />) } />
                        <Route path="/article/:id" render={ props=> (<Article {...props} {...InitData} />) } />
                        <Route path="/photoes" render={ props=> (<Photoes {...props} {...InitData} />) }  />
                        <Route path="/message" render={ props=> (<Message {...props} {...InitData} />) }  />
                        <Route path="/travel" render={ props=> (<Travel {...props} {...InitData} />) } />
                        <Route path="/books" render={ props=> (<Books {...props} {...InitData} />) } />
                        <Route path="/about" render={ props=> (<About {...props} {...InitData} />) } />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <ScrollToTop />
            <Footer />
        </div>
        )
    }
}

export default withRouter(App);