/* ------------------------------------------------------------------------- *
 * Copyright 2002-2025, OpenNebula Project, OpenNebula Systems               *
 *                                                                           *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may   *
 * not use this file except in compliance with the License. You may obtain   *
 * a copy of the License at                                                  *
 *                                                                           *
 * http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                           *
 * Unless required by applicable law or agreed to in writing, software       *
 * distributed under the License is distributed on an "AS IS" BASIS,         *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 * See the License for the specific language governing permissions and       *
 * limitations under the License.                                            *
 * ------------------------------------------------------------------------- */
import { ReactElement } from 'react'
import PropTypes from 'prop-types'

import EmptyTab from '@modules/components/Tabs/EmptyTab'
import Information from '@modules/components/Tabs/Host/Numa/information'

import { getHostNuma } from '@ModelsModule'
import { HostAPI } from '@FeaturesModule'

import UpdatePinPolicyForm from '@modules/components/Tabs/Host/Numa/UpdatePinPolicy'
import UpdateIsolatedCPUSForm from '@modules/components/Tabs/Host/Numa/UpdateIsolatedCPUS'
import { T } from '@ConstantsModule'

/**
 * Renders mainly information tab.
 *
 * @param {object} props - Props
 * @param {string} props.id - Host id
 * @returns {ReactElement} Information tab
 */
const NumaInfoTab = ({ id }) => {
  const { data: host = {} } = HostAPI.useGetHostQuery({ id })
  const numa = getHostNuma(host)

  return (
    <>
      <UpdatePinPolicyForm host={host} />
      <UpdateIsolatedCPUSForm host={host} />
      {numa?.length > 0 ? (
        numa.map((node) => (
          <Information key={node.NODE_ID} node={node} host={host} />
        ))
      ) : (
        <EmptyTab />
      )}
    </>
  )
}

NumaInfoTab.propTypes = {
  tabProps: PropTypes.object,
  id: PropTypes.string,
}

NumaInfoTab.displayName = 'NumaInfoTab'
NumaInfoTab.label = T.Numa

export default NumaInfoTab
