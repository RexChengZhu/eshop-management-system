import { IRouteComponentProps } from 'umi';
import { getUser } from '@/utils/storage';
import { Redirect } from 'umi';

export default ({ children }: IRouteComponentProps) => {

  const user = getUser();
  if (user !== null) {
    return (
      <>
        {children}
      </>
    );
  } else {
    return <Redirect to={'/login'} />;
  }
}
