import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function withCleaner(WrappedComponent, cleanupFunctions) {
  return function (props) {
    const dispatch = useDispatch();
    useEffect(() => cleanup, []);

    const cleanup = () => cleanupFunctions.forEach(funct => dispatch(funct()));

    return <WrappedComponent {...props} cleanup={cleanup} />;
  };
}
