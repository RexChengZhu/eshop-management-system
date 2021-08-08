import { IRouteComponentProps } from 'umi';
import { Redirect } from 'umi';

export default ({ children }: IRouteComponentProps) => {

    return (
      <>
        {children}
      </>
    );
}
